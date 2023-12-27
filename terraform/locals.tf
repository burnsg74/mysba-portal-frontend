locals {
  all = {
    default = {
      region = "us-east-1"
    }
    lower = {
      account_id = "474340895216"
    }
    upper = {
      account_id = "286837973291"
    }
  }

  env = merge(
    try(local.all.default, {}),
    try(local.all[terraform.workspace], {})
  )

  # GitHub OIDC Config
  github = {
    org = "USSBA"
    repositories = [
      # add future repositories to this list and reapply terraform.
      "mysba-front-end",
      "mysba-infrastructure",
    ]
  }
}
