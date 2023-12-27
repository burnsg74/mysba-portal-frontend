data "aws_route53_zone" "zone" {
  name = "dev.mysba.ussba.io."
}

resource "aws_acm_certificate" "cert" {
  domain_name               = "dev.mysba.ussba.io"
  validation_method         = "DNS"
  subject_alternative_names = ["www.dev.mysba.ussba.io"]

  tags = {
    Environment = "dev"
  }

  lifecycle {
    create_before_destroy = true
  }
}

