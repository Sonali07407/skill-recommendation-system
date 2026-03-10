import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
import os

# Set style for plotting
sns.set(style="whitegrid")

def perform_knn_analysis(csv_path):
    print(f"Loading dataset from: {csv_path}")
    df = pd.read_csv(csv_path)
    
    # Preprocessing
    # Transform skills list into TF-IDF vectors
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(df['Skills'])
    
    # Encode the roles (target labels)
    le = LabelEncoder()
    y = le.fit_transform(df['Role'])
    
    k_range = range(1, 16)
    k_scores = []
    
    print("Performing cross-validation for k in range 1 to 15...")
    for k in k_range:
        # For small datasets, cv=k might not be possible if one class has very few samples.
        # We'll use cv=3 for this small sample dataset.
        knn = KNeighborsClassifier(n_neighbors=k)
        scores = cross_val_score(knn, X, y, cv=3, scoring='accuracy')
        k_scores.append(scores.mean())
        print(f"k={k}, Mean Accuracy: {scores.mean():.4f}")
        
    # Find the best k
    best_k = k_range[np.argmax(k_scores)]
    best_score = max(k_scores)
    
    print(f"\nBest accuracy: {best_score:.4f} found at k={best_k}")
    
    # Plotting the result
    plt.figure(figsize=(10, 6))
    plt.plot(k_range, k_scores, marker='o', linestyle='-', color='b')
    plt.title('KNN Accuracy vs. Number of Neighbors (k)', fontsize=15)
    plt.xlabel('Value of k for KNN', fontsize=12)
    plt.ylabel('Cross-Validated Accuracy', fontsize=12)
    plt.xticks(k_range)
    plt.grid(True)
    
    # Save the plot
    plot_filename = 'knn_accuracy_plot.png'
    plt.savefig(plot_filename)
    print(f"Plot saved as: {plot_filename}")
    
    # Also show the plot if possible (not needed for non-interactive but good to have)
    # plt.show()
    
    return best_k, best_score

if __name__ == "__main__":
    csv_file = 'skills_dataset.csv'
    if os.path.exists(csv_file):
        perform_knn_analysis(csv_file)
    else:
        print(f"Error: {csv_file} not found.")
