locals {
  all = {
    default = {
      region          = "us-east-1"
      sts_external_id = "65e13d1f-4d2d-43de-a285-a3531d8d4b4c"
      principal_id    = "197857026523"
    }
    dev = {
      account_id     = "474340895216"
      zone_name      = "dev.mysba.ussba.io"
      web_fqdn       = "dev.mysba.ussba.io"
      frontend_alias = "dev.mysba.ussba.io"
    }
    test = {
      account_id     = "474340895216"
      zone_name      = "test.mysba.ussba.io"
      web_fqdn       = "test.mysba.ussba.io"
      frontend_alias = "test.mysba.ussba.io"
    }
    stg = {
      account_id     = "286837973291"
      zone_name      = "stg.mysba.ussba.io"
      web_fqdn       = "stg.mysba.ussba.io"
      frontend_alias = "stg.mysba.ussba.io"
    }
    prod = {
      account_id = "286837973291"
      # prod zone_name and web_fqdn will change in the future when my.sba.gov is delegated
      zone_name      = "my.sba.gov"
      web_fqdn       = "my.sba.gov"
      frontend_alias = "my.sba.gov"
    }
  }

  env = merge(
    try(local.all.default, {}),
    try(local.all[terraform.workspace], {})
  )
}
