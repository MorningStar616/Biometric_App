import cv2
import numpy as np
import skimage.morphology
from skimage.morphology import convex_hull_image, erosion, square
import math
from skimage.measure import label, regionprops
from skimage.draw import circle_perimeter, set_color


class MinutiaeFeature:
    def __init__(self, locX, locY, Orientation, Type):
        self.locX = locX
        self.locY = locY
        self.Orientation = Orientation
        self.Type = Type


class FingerprintFeatureExtractor:
    def __init__(self):
        self._mask = []
        self._skel = []
        self.minutiaeTerm = []
        self.minutiaeBif = []

    def __skeletonize(self, img):
        img = np.uint8(img > 128)
        self._skel = skimage.morphology.skeletonize(img)
        self._skel = np.uint8(self._skel) * 255
        self._mask = img * 255

    def __computeAngle(self, block, minutiaeType):
        angle = []
        (blkRows, blkCols) = np.shape(block)
        CenterX, CenterY = (blkRows - 1) / 2, (blkCols - 1) / 2
        sumVal = 0
        for i in range(blkRows):
            for j in range(blkCols):
                if (i == 0 or i == blkRows - 1 or j == 0 or j == blkCols - 1) and block[i][j] != 0:
                    angle.append(-math.degrees(math.atan2(i - CenterY, j - CenterX)))
                    sumVal += 1

        if minutiaeType.lower() == 'termination' and sumVal > 1:
            angle.append(float('nan'))
        elif minutiaeType.lower() == 'bifurcation' and sumVal != 3:
            angle.append(float('nan'))

        return angle

    def __getTerminationBifurcation(self):
        self._skel = self._skel == 255
        (rows, cols) = self._skel.shape
        self.minutiaeTerm = np.zeros(self._skel.shape)
        self.minutiaeBif = np.zeros(self._skel.shape)

        for i in range(1, rows - 1):
            for j in range(1, cols - 1):
                if self._skel[i][j] == 1:
                    block = self._skel[i - 1:i + 2, j - 1:j + 2]
                    block_val = np.sum(block)
                    if block_val == 2:
                        self.minutiaeTerm[i, j] = 1
                    elif block_val == 4:
                        self.minutiaeBif[i, j] = 1

        self._mask = convex_hull_image(self._mask > 0)
        self._mask = erosion(self._mask, square(5))
        self.minutiaeTerm = np.uint8(self._mask) * self.minutiaeTerm

    def __performFeatureExtraction(self):
        FeaturesTerm = []
        self.minutiaeTerm = label(self.minutiaeTerm, connectivity=2)
        RP = regionprops(np.uint8(self.minutiaeTerm))

        WindowSize = 2
        for i in RP:
            (row, col) = np.int16(np.round(i['centroid']))
            block = self._skel[row - WindowSize:row + WindowSize + 1, col - WindowSize:col + WindowSize + 1]
            angle = self.__computeAngle(block, 'Termination')
            if len(angle) == 1:
                FeaturesTerm.append([col, row])  # Switched to [x, y]

        FeaturesBif = []
        self.minutiaeBif = label(self.minutiaeBif, connectivity=2)
        RP = regionprops(np.uint8(self.minutiaeBif))
        WindowSize = 1
        for i in RP:
            (row, col) = np.int16(np.round(i['centroid']))
            block = self._skel[row - WindowSize:row + WindowSize + 1, col - WindowSize:col + WindowSize + 1]
            angle = self.__computeAngle(block, 'Bifurcation')
            if len(angle) == 3:
                FeaturesBif.append([col, row])  # Switched to [x, y]
        return FeaturesTerm, FeaturesBif

    def extractMinutiaeFeatures(self, img):
        self.__skeletonize(img)
        self.__getTerminationBifurcation()
        FeaturesTerm, FeaturesBif = self.__performFeatureExtraction()
        return FeaturesTerm, FeaturesBif

    def showResults(self):
        BifLabel = label(self.minutiaeBif, connectivity=2)
        TermLabel = label(self.minutiaeTerm, connectivity=2)

        (rows, cols) = self._skel.shape
        DispImg = np.zeros((rows, cols, 3), np.uint8)
        DispImg[:, :, 0] = 255 * self._skel
        DispImg[:, :, 1] = 255 * self._skel
        DispImg[:, :, 2] = 255 * self._skel

        RP = regionprops(BifLabel)
        for i in RP:
            (row, col) = np.int16(np.round(i['centroid']))
            rr, cc = circle_perimeter(row, col, 3)
            set_color(DispImg, (rr, cc), (255, 0, 0))

        RP = regionprops(TermLabel)
        for i in RP:
            (row, col) = np.int16(np.round(i['centroid']))
            rr, cc = circle_perimeter(row, col, 3)
            set_color(DispImg, (rr, cc), (0, 0, 255))

        cv2.imshow('Minutiae Features', DispImg)
        cv2.waitKey(0)
        cv2.destroyAllWindows()


def preprocess_fingerprint(image):
    normalized_img = cv2.normalize(image, None, 0, 255, cv2.NORM_MINMAX)
    _, binary_img = cv2.threshold(normalized_img, 127, 255, cv2.THRESH_BINARY)
    skeleton = skimage.morphology.skeletonize(binary_img // 255)
    return np.uint8(skeleton) * 255


def extract_minutiae_features(img, showResult=False):
    feature_extractor = FingerprintFeatureExtractor()
    termination_locations, bifurcation_locations = feature_extractor.extractMinutiaeFeatures(img)

    if showResult:
        feature_extractor.showResults()

    return termination_locations, bifurcation_locations


if __name__ == "__main__":
    image_path = r"C:\Users\ghana\OneDrive\Desktop\bio\backend\images\image.jpg"  # Replace with your fingerprint image path
    fingerprint_img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Preprocess the image
    preprocessed_img = preprocess_fingerprint(fingerprint_img)

    # Extract minutiae features
    term_locations, bif_locations = extract_minutiae_features(preprocessed_img, showResult=True)

    termination_points = []
    bifurcation_points = []

    for point in term_locations:
        termination_points.append([int(point[0]), int(point[1])])

    for point in bif_locations:
        bifurcation_points.append([int(point[0]), int(point[1])])

    print("Termination Points:", termination_points)
    print("Bifurcation Points:", bifurcation_points)

