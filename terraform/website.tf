resource "aws_s3_bucket" "bucket" {
  bucket = "${local.env.account_id}-${local.env.region}-${terraform.workspace}-mysba-portal-frontend"
}

resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket                  = aws_s3_bucket.bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_logging" "bucket_logging" {
  bucket        = aws_s3_bucket.bucket.id
  target_bucket = "${local.env.account_id}-${local.env.region}-logs"
  target_prefix = "s3/${local.env.account_id}/${aws_s3_bucket.bucket.id}/"
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.bucket.id
  policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        {
          Sid    = "AllowCloudFrontServicePrincipal"
          Effect = "Allow"
          Principal = {
            Service = "cloudfront.amazonaws.com"
          }
          Action   = "s3:GetObject"
          Resource = "${aws_s3_bucket.bucket.arn}/*"
          Condition = {
            StringEquals = {
              "AWS:SourceArn": aws_cloudfront_distribution.distribution.arn
            }
          }
        }
      ]
    }
  )
}
