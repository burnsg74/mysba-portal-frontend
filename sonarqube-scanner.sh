export SONAR_SECRET=sqp_cb87efab4dd9b10f124183e352f921dcd746162d
sonar-scanner \
  -Dsonar.projectKey="MySBA-Home" \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token="${SONAR_SECRET}"