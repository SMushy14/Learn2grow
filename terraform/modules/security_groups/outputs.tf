output "bastion_sg_id" {
  description = "Security group ID for the bastion host"
  value       = aws_security_group.bastion.id
}

output "app_sg_id" {
  description = "Security group ID for the app server"
  value       = aws_security_group.app.id
}

output "db_sg_id" {
  description = "Security group ID for the database"
  value       = aws_security_group.db.id
}
