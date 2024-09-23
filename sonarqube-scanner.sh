sonar-scanner \
  -Dsonar.projectKey=MySBA \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token="${SONAR_SECRET}"