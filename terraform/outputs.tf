output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}

output "bastion_public_ip" {
  description = "Public IP of the bastion host — use this to SSH in"
  value       = module.bastion.public_ip
}

output "app_private_ip" {
  description = "Private IP of the app server (accessible via bastion)"
  value       = module.ec2.private_ip
}


output "ecr_backend_url" {
  description = "ECR repository URL for the backend image"
  value       = module.ecr.backend_repository_url
}

output "ecr_frontend_url" {
  description = "ECR repository URL for the frontend image"
  value       = module.ecr.frontend_repository_url
}
