terraform {
  backend "s3" {
    bucket               = "mysba-terraform-remote-state"
    dynamodb_table       = "mysba-terraform-locktable-account"
    acl                  = "bucket-owner-full-control"
    key                  = "frontend.tfstate"
    region               = "us-east-1"
    workspace_key_prefix = "frontend"
  }
}