import os

if __name__ == "__main__":
    os.system("docker login -u cookbenjamin -p Mangoes!42")
    os.system("docker push cookbenjamin/helloworld:latest")