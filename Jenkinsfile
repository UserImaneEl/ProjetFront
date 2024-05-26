pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git git branch: 'maine', url: 'https://github.com/UserImaneEl/ProjetFront.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("imane02/projetfront:latest")
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'd0612690-ab25-45ce-bcdd-68408a05156f') {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Run Container') {
            steps {
                script {
                    try {
                        // Attempt to remove any existing container with the same name
                        bat 'docker rm -f projetfront || true'
                    } catch (Exception e) {
                        echo 'No existing container to remove'
                    }
                    // Run the container with restart policy set to always
                    bat 'docker run -d --name projetfront --restart always -p 8082:8082 imane02/projetfront:latest'
                }
            }
        }
    }
}
