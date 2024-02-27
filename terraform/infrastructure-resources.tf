data "aws_route53_zone" "zone" {
  name = local.env.zone_name
}

data "aws_cloudfront_cache_policy" "cache_optimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_cache_policy" "cache_disabled" {
  name = "Managed-CachingDisabled"
}

data "aws_acm_certificate" "web" {
  domain      = local.env.zone_name
  types       = ["AMAZON_ISSUED"]
  statuses    = ["ISSUED"]
  most_recent = true
}

data "aws_s3_bucket" "logs" {
  bucket = "${local.env.account_id}-${local.env.region}-logs"
}
