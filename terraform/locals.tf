locals {
  all = {
    default = {
      region          = "us-east-1"
      sts_external_id = "65e13d1f-4d2d-43de-a285-a3531d8d4b4c"
      principal_id    = "197857026523"
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

  s3_bucket_name = "mysba-portal-frontend-dev"
}
