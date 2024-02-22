resource "aws_route53_record" "web_ipv4" {
  allow_overwrite = true
  zone_id         = data.aws_route53_zone.zone.zone_id
  name            = local.env.web_fqdn
  type            = "A"
  alias {
    name                   = aws_cloudfront_distribution.distribution.domain_name
    zone_id                = aws_cloudfront_distribution.distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "web_ipv6" {
  allow_overwrite = true
  zone_id         = data.aws_route53_zone.zone.zone_id
  name            = local.env.web_fqdn
  type            = "AAAA"
  alias {
    name                   = aws_cloudfront_distribution.distribution.domain_name
    zone_id                = aws_cloudfront_distribution.distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
