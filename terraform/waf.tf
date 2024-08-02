resource "aws_wafv2_web_acl" "waf_cloudfront" {
  description = "${terraform.workspace}-mysba-portal-frontend-acl"
  name        = "${terraform.workspace}-mysba-portal-frontend-acl"
  scope       = "CLOUDFRONT"

  default_action {
    allow {}
  }

  # This group contains rules that are based on Amazon threat intelligence. This is useful
  # if you would like to block sources associated with bots or other threats.
  # - https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-ip-rep.html
  rule {
    priority = 0
    name     = "amazon-ip-reputation"
    override_action {
      none {}
    }
    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesAmazonIpReputationList"
        vendor_name = "AWS"
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "aws-ip-reputation"
      sampled_requests_enabled   = false
    }
  }

  # RateLimit for DDoS protections
  rule {
    name     = "rate-limit"
    priority = 1
    action {
      block {}
    }
    statement {
      rate_based_statement {
        aggregate_key_type = "IP"
        limit              = 2500 # this may need to be adjusted in the future. 2500 requests in a 5 minute period is a lot, and 99% chance that kind of traffic would not be real SBA user traffic.
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "rate-limit"
      sampled_requests_enabled   = false
    }
  }
  rule {
    name     = "bot-control"
    priority = 2

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesBotControlRuleSet"
        vendor_name = "AWS"

        managed_rule_group_configs {
          aws_managed_rules_bot_control_rule_set {
            inspection_level = "TARGETED"
          }
        }

        rule_action_override {
          name = "TGT_VolumetricSession"
          action_to_use {
            count {}
          }
        }

        rule_action_override {
          name = "TGT_SignalAutomatedBrowser"
          action_to_use {
            count {}
          }
        }

        rule_action_override {
          name = "TGT_SignalBrowserInconsistency"
          action_to_use {
            count {}
          }
        }


      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWS-AWSManagedRulesBotControlRuleSet"
      sampled_requests_enabled   = true
    }
  }


  # Baseline managed rule groups provide general protection against a wide variety of
  # common threats. Choose one or more of these rule groups to establish baseline protection for your resources.
  # - https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-baseline.html
  rule {
    priority = 3
    name     = "amazon-common"
    override_action {
      none {}
    }
    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "aws-common"
      sampled_requests_enabled   = false
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${terraform.workspace}-mysba-portal-frontend-cloudfront-acl"
    sampled_requests_enabled   = false
  }
}
