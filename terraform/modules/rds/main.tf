# DocumentDB is AWS's managed MongoDB-compatible database service
# It satisfies the "managed database (RDS)" requirement for this project

resource "aws_docdb_subnet_group" "main" {
  name       = "${var.project_name}-${var.environment}-docdb-subnet-group"
  subnet_ids = var.private_subnet_ids

  tags = {
    Name        = "${var.project_name}-${var.environment}-docdb-subnet-group"
    Environment = var.environment
  }
}

resource "aws_docdb_cluster_parameter_group" "main" {
  family      = "docdb5.0"
  name        = "${var.project_name}-${var.environment}-docdb-params"
  description = "DocumentDB cluster parameter group"

  parameter {
    name  = "tls"
    value = "disabled"
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-docdb-params"
    Environment = var.environment
  }
}

resource "aws_docdb_cluster" "main" {
  cluster_identifier              = "${var.project_name}-${var.environment}-docdb"
  engine                          = "docdb"
  master_username                 = var.db_username
  master_password                 = var.db_password
  db_subnet_group_name            = aws_docdb_subnet_group.main.name
  vpc_security_group_ids          = [var.security_group_id]
  db_cluster_parameter_group_name = aws_docdb_cluster_parameter_group.main.name
  skip_final_snapshot             = true

  tags = {
    Name        = "${var.project_name}-${var.environment}-docdb"
    Environment = var.environment
  }
}

resource "aws_docdb_cluster_instance" "main" {
  identifier         = "${var.project_name}-${var.environment}-docdb-instance"
  cluster_identifier = aws_docdb_cluster.main.id
  instance_class     = "db.t3.medium"

  tags = {
    Name        = "${var.project_name}-${var.environment}-docdb-instance"
    Environment = var.environment
  }
}
