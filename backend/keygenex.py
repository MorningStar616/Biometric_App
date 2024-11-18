import math

def extract_features(end_points):
    # Extract coordinates of minutiae points
    x1, y1 = end_points[0]
    x2, y2 = end_points[1]
    x3, y3 = end_points[2]
    x4, y4 = end_points[3]

    # Calculate distances between consecutive minutiae points
    d12 = int(math.sqrt((x1 - x2)**2 + (y1 - y2)**2))
    d23 = int(math.sqrt((x2 - x3)**2 + (y2 - y3)**2))
    d34 = int(math.sqrt((x3 - x4)**2 + (y3 - y4)**2))
    d41 = int(math.sqrt((x4 - x1)**2 + (y4 - y1)**2))

    # Check if distances are non-zero
    if d12 != 0 and d23 != 0 and d34 != 0 and d41 != 0:
        # Calculate cosines of angles using Law of Cosines
        i12 = ((d23**2) + (d34**2) + (d41**2) - (d12**2)) / (2 * d23 * d34 * d41)
        i23 = ((d34**2) + (d12**2) + (d41**2) - (d23**2)) / (2 * d34 * d12 * d41)
        i34 = ((d12**2) + (d23**2) + (d41**2) - (d34**2)) / (2 * d23 * d12 * d41)
        i41 = ((d12**2) + (d23**2) + (d34**2) - (d41**2)) / (2 * d23 * d12 * d34)

        # Ensure cosines are within valid range [-1, 1]
        i12 = max(-1, min(1, i12))
        i23 = max(-1, min(1, i23))
        i34 = max(-1, min(1, i34))
        i41 = max(-1, min(1, i41))

        # Calculate angles in degrees
        t12 = 180 - math.degrees(math.acos(i12))
        t23 = 180 - math.degrees(math.acos(i23))
        t34 = 180 - math.degrees(math.acos(i34))
        t41 = 180 - math.degrees(math.acos(i41))

        # Calculate relative angles
        al12 = math.atan2((y1 - y2), (x1 - x2)) - math.radians(t12)
        al23 = math.atan2((y2 - y3), (x2 - x3)) - math.radians(t23)
        al34 = math.atan2((y3 - y4), (x3 - x4)) - math.radians(t34)
        al41 = math.atan2((y4 - y1), (x4 - x1)) - math.radians(t41)

        # Convert values to strings for feature vector
        d121, d231, d341, d411 = str(d12), str(d23), str(d34), str(d41)
        al121, al231, al341, al411 = str(al12), str(al23), str(al34), str(al41)

        # Create and return the feature vector with labels
        sv = f"Distances: {d121}_{d231}_{d341}_{d411}, Angles: {al121}_{al231}_{al341}_{al411}"
        return sv

    # Return an empty string if distances are zero
    return "Invalid input: Distances between minutiae points are zero."

# Example minutiae points (replace with actual minutiae points)
end_points = [(35, 112), (47, 110), (50, 79), (73, 165)]
# Extract features
feature_vector = extract_features(end_points)

# Display the extracted feature vector
print("Feature Vector:", feature_vector)
