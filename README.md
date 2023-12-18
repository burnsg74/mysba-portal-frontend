# mysba-portal-frontend

## Table of Contents

1. [Architecture](#architecture)
2. [Terraform-States](#terraform-states)
2. [Logging](#logging)

## Architecture

### TODO: A proper holding place for future architecture diagrams

## Terraform States

### TODO: A proper holding place for front end terraform.
** We recommend making a .terraform/ directory **

### Logging

To satisfy SBA security & compliance requirements all `CloudFront`, `ELB` and `S3` access logs must be written to the accounts delegated `log` bucket. To ensure `access logs` are replicated, resources should be configured to write to the bucket in the lower & upper account. Logs in this bucket should be separated by prefixes for their respective resources, see the examples below.

**Lower Log Bucket**
- `474340895216-us-east-1-logs`

**Upper Log Bucket**
- `286837973291-us-east-1-logs`

## ALB & CloudFront Logging Convention

**Example: ALB logs separated by prefixes**

`s3://${account_id}-us-east-1-logs/alb/hello-world/${env}`

**Example: CloudFront logs separated by prefixes**

`s3://${account_id}-us-east-1-logs/cloudfront/hello-world/${env}`

## S3 Access Logging Convention

**Example: S3 logs separated by prefixes**

`s3://${account_id}-us-east-1-logs/s3/${account_id}/${bucket_name}`

**Example: WAF logs separated by prefixes**

`s3://${account_id}-us-east-1-logs/wafv2/${account_id}/${waf_name}`

**Example: WAF logs separated by prefixes**

`s3://${account_id}-us-east-1-logs/vpc-flow-logs/${account_id}/${env}`

## CloudWatch Logging

Currently all `CloudWatch` logs are sent to the `Log Archive` account. This is controlled by the `AWS Control Tower` account.

## Github Automation

### Folder Structure

For `Github` automation the following directories will already exist.

`./.github/actions/`: Contains re-usable modules which are used in each workflow.

`./.github/workflows/`: Contains workflows for each environment.`
