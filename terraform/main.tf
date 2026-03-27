terraform {
  required_version = ">= 1.5.0"

  backend "s3" {
    bucket         = "learn2grow-terraform-state"
    key            = "terraform.tfstate"
    region         = "af-south-1"
    dynamodb_table = "learn2grow-terraform-locks"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source       = "./modules/vpc"
  project_name = var.project_name
  environment  = var.environment
  vpc_cidr     = var.vpc_cidr
}

module "security_groups" {
  source       = "./modules/security_groups"
  project_name = var.project_name
  environment  = var.environment
  vpc_id       = module.vpc.vpc_id
}

module "bastion" {
  source            = "./modules/bastion"
  project_name      = var.project_name
  environment       = var.environment
  public_subnet_id  = module.vpc.public_subnet_ids[0]
  security_group_id = module.security_groups.bastion_sg_id
  key_pair_name     = var.key_pair_name
}

module "ec2" {
  source            = "./modules/ec2"
  project_name      = var.project_name
  environment       = var.environment
  private_subnet_id = module.vpc.private_subnet_ids[0]
  security_group_id = module.security_groups.app_sg_id
  key_pair_name     = var.key_pair_name
}

module "ecr" {
  source       = "./modules/ecr"
  project_name = var.project_name
  environment  = var.environment
}

module "alb" {
  source            = "./modules/alb"
  project_name      = var.project_name
  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids
  security_group_id = module.security_groups.alb_sg_id
  instance_id       = module.ec2.instance_id
}

output "app_url" {
  description = "Public URL of the application"
  value       = "http://${module.alb.alb_dns_name}"
}
