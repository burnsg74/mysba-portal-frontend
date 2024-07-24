 #!/bin/bash
jq -r 'to_entries | map([.key, .value]) | (["key", "value"], .[]) | @csv' translation.json > translation.csv

