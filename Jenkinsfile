
pipeline {
  agent any
  tools {
    NodeJs 'NodeJs-19.0.0' 
  }
  stages {
    stage ('Build') {
      steps {
      sh 'ls -al'
     
        sh 'npm install'
        sh 'npm build'
        sh 'npm build compile'
//         sh 'mvn clean deploy'
        
      }
    }
//     stage ('Deploy') {
//       steps {
//         script {
//           deploy adapters: [tomcat9(credentialsId: 'tomcat_credential', path: '', url: 'http://dayal-test.letspractice.tk:8081')], contextPath: '/pipeline', onFailure: false, war: 'webapp/target/*.war' 
//         }
//       }
//     }
  }
}
