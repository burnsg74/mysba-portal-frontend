resource "aws_cloudfront_distribution" "distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  http_version        = "http2"
  price_class         = "PriceClass_100"

  aliases = [
    "${terraform.workspace}.mysba.ussba.io"
  ]

  origin {
    domain_name              = aws_s3_bucket.bucket.bucket_regional_domain_name
    origin_id                = "mysba-portal-frontend"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  viewer_certificate {
    acm_certificate_arn            = data.aws_acm_certificate.web.arn
    cloudfront_default_certificate = false
    minimum_protocol_version       = "TLSv1.2_2021"
    ssl_support_method             = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "blacklist"
      locations        = ["RU", "HK", "CN"]
    }
  }

  default_cache_behavior {
    # caching disabled unless its production
    cache_policy_id        = terraform.workspace == "prod" ? data.aws_cloudfront_cache_policy.cache_optimized.id : data.aws_cloudfront_cache_policy.cache_disabled.id
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "mysba-portal-frontend"
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  logging_config {
    bucket          = "${local.env.account_id}-${local.env.region}-logs.s3.amazonaws.com"
    include_cookies = false
    prefix          = "cloudfront/mysba-portal-frontend/${terraform.workspace}"
  }
}