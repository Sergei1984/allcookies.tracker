pipeline {
    agent any

    stages {
        stage('Build Backend') {
            steps {
                sh './allcookies-tracker-backend/publish.sh'
            }

        }
        
        stage('Build Admin') {
            steps {
                sh './allcookies-tracker-admin/publish.sh'
            }
        }
    }
}