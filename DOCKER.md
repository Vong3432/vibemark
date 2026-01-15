# Docker Setup Guide

This guide explains how to run the Bookmark Backend application using Docker.

## Prerequisites

- Docker installed (version 20.10 or higher)
- Docker Compose installed (version 2.0 or higher)

## Quick Start

### Production Mode

Run the application in production mode with optimized build:

```bash
# Start all services (PostgreSQL + NestJS app)
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

The application will be available at `http://localhost:3000`

### Development Mode

Run the application in development mode with hot reload:

```bash
# Start development environment
docker compose -f docker-compose.dev.yml up

# Or use the npm script
pnpm run docker:dev

# Stop development environment
docker compose -f docker-compose.dev.yml down
```

In development mode:
- Source code is mounted as a volume for hot reload
- Changes to `src/` directory will automatically restart the application
- Debug port 9229 is exposed for Node.js debugging

## Available Services

### PostgreSQL Database
- **Port:** 5432
- **Database:** bookmarks
- **Username:** postgres
- **Password:** postgres
- **Data persistence:** Stored in Docker volume `postgres_data`

### NestJS Application
- **Port:** 3000
- **Health check endpoint:** `http://localhost:3000/health`
- **API endpoints:** See main README.md

## Docker Commands

### Using npm scripts (recommended):

```bash
# Build Docker image
pnpm run docker:build

# Start production services
pnpm run docker:up

# Stop services
pnpm run docker:down

# View logs
pnpm run docker:logs

# Start development environment
pnpm run docker:dev

# Stop development environment
pnpm run docker:dev:down

# Clean up (remove containers, volumes, and images)
pnpm run docker:clean
```

### Using docker compose directly:

```bash
# Build images
docker compose build

# Start services in foreground
docker compose up

# Start services in background
docker compose up -d

# Stop services
docker compose down

# Stop services and remove volumes
docker compose down -v

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f app
docker compose logs -f db

# Restart specific service
docker compose restart app

# Execute command in running container
docker compose exec app sh
docker compose exec db psql -U postgres -d bookmarks
```

## Environment Variables

The application uses the following environment variables (configured in docker-compose files):

- `NODE_ENV`: Application environment (development/production)
- `PORT`: Application port (default: 3000)
- `DB_HOST`: PostgreSQL host (default: db)
- `DB_PORT`: PostgreSQL port (default: 5432)
- `DB_USERNAME`: Database username (default: postgres)
- `DB_PASSWORD`: Database password (default: postgres)
- `DB_DATABASE`: Database name (default: bookmarks)

To customize these values:

1. Copy `.env.example` to `.env`
2. Modify the values as needed
3. Update `docker-compose.yml` to use the `.env` file

## Docker Images

### Production Image (Dockerfile)
- **Base:** node:20-alpine
- **Size:** Optimized with multi-stage build
- **Features:**
  - Production dependencies only
  - Non-root user (nestjs)
  - Health check included
  - Compiled TypeScript (no source code)

### Development Image (Dockerfile.dev)
- **Base:** node:20-alpine
- **Features:**
  - All dependencies (dev + prod)
  - Source code mounted as volume
  - Hot reload enabled
  - Debug port exposed

## Volumes

### postgres_data
Stores PostgreSQL database files for data persistence. Data remains even when containers are stopped.

To completely reset the database:
```bash
docker compose down -v
docker compose up -d
```

## Networking

All services run on a custom bridge network (`bookmark-network`) which allows:
- Service discovery by name (e.g., `db` hostname)
- Isolated network environment
- Secure inter-container communication

## Health Checks

Both services include health checks:

**Database (PostgreSQL):**
- Checks if PostgreSQL is ready to accept connections
- Runs every 10 seconds
- Application waits for database to be healthy before starting

**Application (NestJS):**
- Checks `/health` endpoint
- Runs every 30 seconds
- Returns 200 status when application is healthy

View health status:
```bash
docker compose ps
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker compose logs -f app

# Check if port is already in use
lsof -i :3000
lsof -i :5432
```

### Database connection issues
```bash
# Verify database is healthy
docker compose ps

# Check database logs
docker compose logs -f db

# Connect to database manually
docker compose exec db psql -U postgres -d bookmarks
```

### Clear all data and restart
```bash
# Stop all services and remove volumes
docker compose down -v

# Remove all unused Docker resources
docker system prune -a

# Rebuild and start
docker compose up --build -d
```

### Access container shell
```bash
# Access application container
docker compose exec app sh

# Access database container
docker compose exec db sh
```

### Reset everything
```bash
# Stop and remove everything
pnpm run docker:clean

# Or manually
docker compose down -v
docker system prune -a -f
docker volume prune -f
```

## Production Considerations

When deploying to production:

1. **Use environment-specific configuration:**
   - Create `docker-compose.prod.yml` with production settings
   - Use secrets management for sensitive data
   - Remove default passwords

2. **Enable security features:**
   - Run containers with read-only root filesystem
   - Use Docker secrets for sensitive data
   - Enable resource limits

3. **Add monitoring:**
   - Configure log aggregation
   - Set up health check monitoring
   - Add metrics collection

4. **Database backups:**
   - Set up automated database backups
   - Store backups outside container volumes
   - Test restore procedures

5. **Use a reverse proxy:**
   - Add nginx or traefik for SSL termination
   - Configure CORS properly
   - Enable rate limiting

## Testing the Setup

Once services are running:

```bash
# Check service status
docker compose ps

# Test health endpoint
curl http://localhost:3000/health

# Test API (create bookmark)
curl -X POST http://localhost:3000/bookmarks \
  -H "Content-Type: application/json" \
  -H "x-user-id: test-user-123" \
  -d '{"url": "https://example.com", "title": "Example"}'

# Test API (get bookmarks)
curl http://localhost:3000/bookmarks \
  -H "x-user-id: test-user-123"
```

## Multi-Platform Builds

To build images for multiple architectures (e.g., ARM64 for Apple Silicon, AMD64 for Intel):

```bash
# Enable buildx
docker buildx create --use

# Build for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 \
  -t bookmark-backend:latest .
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [NestJS Docker Documentation](https://docs.nestjs.com/recipes/docker)
- Main application README: [README.md](./README.md)
