import type { Practical } from '../../types/practical';

export const subject1Practicals: Practical[] = [
   {
    id: 'practical-01',
    number: 1,
    title: 'Exploratory Data Analysis using Python',
    language: 'Python',

    aim: 'To perform Exploratory Data Analysis (EDA) on a given dataset using Python.',

    theory: `Exploratory Data Analysis (EDA) is the process of examining and understanding a dataset before applying advanced analysis or machine learning techniques.

EDA helps us understand the structure, characteristics, patterns, relationships, missing values, duplicate records, and distribution of data.

The main steps involved in Exploratory Data Analysis are:

1. **Import the Dataset** – Load the dataset using libraries such as pandas.
2. **View the Data** – Display the first few records using head().
3. **Understand Data Information** – Check columns, data types, number of records, and non-null values.
4. **Generate Statistical Description** – Use descriptive statistics to understand numerical data.
5. **Find Unique Values** – Identify different values present in categorical columns.
6. **Check Duplicate Data** – Verify whether duplicate records are present.
7. **Handle Missing Values** – Detect null values and replace or remove them when required.
8. **Visualization** – Represent important information using graphs and charts.

Python libraries such as Pandas, NumPy, Matplotlib, and Seaborn are commonly used for EDA.`,

    code: `import pandas as pd
import numpy as np

# Create a sample dataset
data = {
    'Feature_1': np.random.rand(200),
    'Feature_2': np.random.randint(1, 100, 200),
    'categorical_Feature': np.random.choice(
        [
            'Cheezy-7 pizza',
            'Exotic Pizza Feast',
            'Margherita Pizza',
            'Schezwan Cheezy Pasta',
            'Paneer 65'
        ],
        200
    ),
    'Target': np.random.randn(200)
}

# Create DataFrame
df = pd.DataFrame(data)

# Save dataset as CSV file
df.to_csv('pizza_data.csv', index=False)

print(df.head())

# Display basic information
print("\\nDataset Information:")
print(df.info())

# Display statistical description
print("\\nDataset Description:")
print(df.describe())

# Find unique values
print("\\nUnique Values:")
print(df['categorical_Feature'].unique())

# Verify duplicate records
print("\\nDuplicate Records:")
print(df.duplicated().sum())

# Check null values
print("\\nNull Values:")
print(df.isnull().sum())`,

    conclusion: 'Thus, Exploratory Data Analysis was performed successfully using Python. The dataset was created, inspected, and analyzed by checking its structure, unique values, duplicate records, and null values.'
  },

  {
    id: 'practical-02',
    number: 2,
    title: 'Statistical Analysis of Dataset',
    language: 'Python',

    aim: 'To perform Exploratory Data Analysis and calculate statistical measures such as mean, median, and mode on the given dataset using Python.',

    theory: `Statistical analysis is an important part of data analysis that helps us understand the central tendency and characteristics of a dataset.

The three important measures of central tendency are:

1. **Mean** – The average value of a set of observations. It is calculated by dividing the sum of all values by the number of values.

2. **Median** – The middle value of a sorted dataset. If the number of observations is even, the median is calculated as the average of the two middle values.

3. **Mode** – The value that occurs most frequently in a dataset.

Pandas provides built-in functions such as mean(), median(), and mode() to calculate these statistical measures easily.

In this practical, the first 50 records of the dataset are selected and numerical columns are analyzed.`,

    code: `import pandas as pd

# Load dataset
df = pd.read_csv('/content/dummy_dataset_100_records.csv')

# Display the first few rows
print("Original DataFrame head:")
display(df.head())

# Display basic information
print("Original DataFrame info:")
df.info()

# Select first 50 records
df_50_records = df.head(50)

# Select numerical columns
numerical_cols = df_50_records.select_dtypes(
    include=['number']
).columns

# Display first 50 records
print(df_50_records)

# Display numerical columns
print(df_50_records[numerical_cols])

# Calculate statistics
print("Calculating statistics for the first 50 records:")

# Mean
mean_values = df_50_records[numerical_cols].mean()

print("\\nMean values:")
display(mean_values)

# Median
median_values = df_50_records[numerical_cols].median()

print("\\nMedian values:")
display(median_values)

# Mode
mode_values = df_50_records[numerical_cols].mode().iloc[0]

print("\\nMode values (first mode if multiple exist):")
display(mode_values)`,

    conclusion: 'Thus, statistical analysis was successfully performed on the first 50 records of the dataset by calculating the mean, median, and mode of the numerical columns.'
  },

  {
    id: 'practical-03',
    number: 3,
    title: 'Multiple Linear Regression',
    language: 'Python',

    aim: 'To perform Multiple Linear Regression on a given dataset and predict marks based on study hours, sleep hours, and attendance.',

    theory: `Multiple Linear Regression is a supervised machine learning algorithm used to predict a continuous dependent variable using two or more independent variables.

In this practical:

- **Study_Hours** is an independent variable.
- **Sleep_Hours** is an independent variable.
- **Attendance** is an independent variable.
- **Marks** is the dependent variable.

The general equation of Multiple Linear Regression is:

Y = b0 + b1X1 + b2X2 + b3X3

Where:

- **Y** = Predicted value
- **b0** = Intercept
- **b1, b2, b3** = Coefficients
- **X1, X2, X3** = Independent variables

The LinearRegression class from scikit-learn is used to train the model and make predictions.`,

    code: `import pandas as pd
from sklearn.linear_model import LinearRegression

# Create dataset
data = {
    "Study_Hours": [4, 5, 7, 8],
    "Sleep_Hours": [5, 6, 7, 8],
    "Attendance": [35, 45, 75, 95],
    "Marks": [35, 50, 70, 90]
}

# Create DataFrame
df = pd.DataFrame(data)

# Independent variables
X = df[[
    "Study_Hours",
    "Sleep_Hours",
    "Attendance"
]]

# Dependent variable
y = df["Marks"]

# Create model
model = LinearRegression()

# Train model
model.fit(X, y)

# Display equation coefficients
print("Intercept (b0):", model.intercept_)
print("Study Hours Coefficient (b1):", model.coef_[0])
print("Sleep Hours Coefficient (b2):", model.coef_[1])
print("Attendance Coefficient (b3):", model.coef_[2])

# Create new student data
new_data = pd.DataFrame(
    [[7, 8, 90]],
    columns=[
        "Study_Hours",
        "Sleep_Hours",
        "Attendance"
    ]
)

# Predict marks
prediction = model.predict(new_data)

print("\\nPredicted Marks:", prediction[0])`,

    conclusion: 'Thus, Multiple Linear Regression was successfully implemented using Python and scikit-learn. The model was trained using study hours, sleep hours, and attendance and was used to predict the marks of a new student.'
  },

  {
    id: 'practical-04',
    number: 4,
    title: 'Logistic Regression',
    language: 'Python',

    aim: 'To perform Logistic Regression on a given dataset and predict whether a student will pass based on study hours, attendance, and internal marks.',

    theory: `Logistic Regression is a supervised machine learning algorithm mainly used for classification problems.

Unlike Linear Regression, which predicts continuous numerical values, Logistic Regression predicts the probability of an observation belonging to a particular class.

In this practical, the target variable is **Pass**:

- **0** → Fail
- **1** → Pass

The input features are:

- **Hours** – Study hours
- **Attendance** – Student attendance percentage
- **Internal** – Internal examination marks

The LogisticRegression class from scikit-learn is used to train the classification model.

The model can provide:

1. **Prediction** – The predicted class.
2. **Probability** – The probability of each possible class using predict_proba().`,

    code: `import pandas as pd
from sklearn.linear_model import LogisticRegression

# Create dataset
data = {
    "Hours": [2, 3, 4, 5, 6, 7],
    "Attendance": [50, 60, 65, 75, 85, 95],
    "Internal": [10, 12, 14, 16, 18, 20],
    "Pass": [0, 0, 0, 1, 1, 1]
}

# Create DataFrame
df = pd.DataFrame(data)

# Input Features
X = df[[
    "Hours",
    "Attendance",
    "Internal"
]]

# Target Variable
y = df["Pass"]

# Create Model
model = LogisticRegression()

# Train Model
model.fit(X, y)

# New student data for prediction
new_student_data = pd.DataFrame([
    {
        "Hours": 5,
        "Attendance": 80,
        "Internal": 18
    }
])

# Predict for a new student
prediction = model.predict(new_student_data)

# Calculate probability
probability = model.predict_proba(new_student_data)

print("Prediction:", prediction)
print("Probability:", probability)`,

    conclusion: 'Thus, Logistic Regression was successfully implemented using Python and scikit-learn. The trained model predicted whether a new student would pass and also calculated the probability of the prediction.'
  },

  {
    id: 'practical-05',
    number: 5,
    title: 'K-Means Clustering',
    language: 'Python',

    aim: 'To use a dataset and apply K-Means Clustering to obtain useful insights from the data.',

    theory: `K-Means Clustering is an unsupervised machine learning algorithm used to divide data into a specified number of groups called clusters.

The algorithm works by:

1. Selecting the number of clusters (K).
2. Initializing cluster centroids.
3. Assigning each data point to the nearest centroid.
4. Recalculating the centroid of each cluster.
5. Repeating the process until the clusters become stable.

In this practical, K-Means is used to group data points based on their characteristics.

The parameter **n_clusters** specifies the number of clusters. The cluster labels are stored in a new column called **Cluster**.

A scatter plot is used to visualize the clusters and their centroids.`,

    code: `import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

# Create dataset
data = {
    "Age": [18, 20, 22, 45, 48, 50],
    "Income": [20000, 22000, 25000, 80000, 85000, 90000]
}

# Create DataFrame
df = pd.DataFrame(data)

# Create K-Means model
model = KMeans(
    n_clusters=2,
    random_state=42
)

# Apply clustering
df["Cluster"] = model.fit_predict(
    df[["Age", "Income"]]
)

# Plot data points
plt.scatter(
    df["Age"],
    df["Income"],
    c=df["Cluster"],
    s=100
)

# Plot centroids
plt.scatter(
    model.cluster_centers_[:, 0],
    model.cluster_centers_[:, 1],
    color="red",
    marker="X",
    s=200,
    label="Centroids"
)

plt.xlabel("Age")
plt.ylabel("Income")
plt.title("K-Means Clustering")
plt.legend()
plt.show()`,

    conclusion: 'Thus, K-Means Clustering was successfully applied to the dataset. The data points were divided into clusters and the resulting clusters and centroids were visualized using a scatter plot.'
  },
];
