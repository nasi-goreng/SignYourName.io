from PIL import Image
import os

# Define the directory
directory = os.getcwd()

# Get the list of images in the directory
images = [f for f in os.listdir(directory) if f.endswith('.jpg')]

# Iterate over the images
for image in images:
    # Open the image
    img = Image.open(os.path.join(directory, image))
    
    # Convert the image to RGB mode
    img = img.convert('RGB')
    
    # Resize the image
    img = img.resize((150, 150))
    
    # Save the image
    img.save(os.path.join(directory, image))