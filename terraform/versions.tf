provider "aws" {
  region              = "us-east-1"
  allowed_account_ids = [local.env.account_id]
  default_tags {
    tags = {
      TerraformSource = "mysba-infrastructure/frontend"
      ManagedBy       = "terraform"
    }
  }
}
terraform {
  required_version = "~> 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
