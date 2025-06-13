# Git Workflow Guidelines

## Pre-Development Checklist

1. **Update Local Repository**:
   ```bash
   # Check remote repository
   git remote -v
   
   # Fetch latest changes
   git fetch origin
   
   # Update main branch
   git checkout main
   git pull origin main
   
   # Verify status
   git status
   ```

2. **Create Feature Branch**:
   ```bash
   # Create and switch to new branch
   git checkout -b feature/your-feature-name
   
   # Verify branch creation
   git branch
   ```

## Branch Naming Conventions

- Feature branches: `feature/description-of-feature`
- Bug fixes: `fix/description-of-bug`
- Hotfixes: `hotfix/description-of-issue`
- Documentation: `docs/description-of-docs`
- Refactoring: `refactor/description-of-refactor`

## Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

Example:
```
feat(ratings): implement group rating system

- Add weighted rating calculations
- Implement category statistics
- Add performance optimizations
```

## Feature Development Workflow

1. Create a new branch from `main`:
   ```bash
   git checkout main
   git pull
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "feat(scope): description of changes"
   ```

3. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request (PR) on GitHub

## Post-Change Steps

1. **Stage Changes**:
   ```bash
   # Review changes
   git status
   
   # Stage specific files
   git add path/to/file1 path/to/file2
   
   # Or stage all changes
   git add .
   ```

2. **Commit Changes**:
   ```bash
   # Commit with descriptive message
   git commit -m "feat(scope): description of changes"
   ```

3. **Push to GitHub**:
   ```bash
   # Push to remote repository
   git push origin feature/your-feature-name
   
   # Verify push
   git status
   ```

4. **Monitor Deployment**:
   - Check Vercel deployment status
   - Verify changes in staging environment
   - Test functionality after deployment

## Before Merging

1. Ensure all tests pass
2. Update documentation if needed
3. Resolve any conflicts with main
4. Get code review approval
5. Squash commits if necessary

## Conflict Resolution

1. Update your branch with main:
   ```bash
   git checkout main
   git pull
   git checkout feature/your-feature-name
   git merge main
   ```

2. Resolve conflicts in your code editor
3. Commit the resolved conflicts:
   ```bash
   git add .
   git commit -m "fix(merge): resolve conflicts with main"
   ```

## Deployment Process

1. Merge to main only after:
   - All tests pass
   - Code review approved
   - Conflicts resolved
   - Documentation updated

2. Deploy to staging first:
   ```bash
   git checkout main
   git pull
   # Deploy to staging
   ```

3. After staging verification, deploy to production:
   ```bash
   # Deploy to production
   ```

## Best Practices

1. **Always create a new branch** for:
   - New features
   - Bug fixes
   - Major refactoring
   - Documentation updates

2. **Keep commits atomic**:
   - One logical change per commit
   - Clear commit messages
   - No unrelated changes

3. **Regular updates**:
   - Pull from main frequently
   - Resolve conflicts early
   - Keep branches short-lived

4. **Before merging**:
   - Run all tests
   - Check for conflicts
   - Update documentation
   - Get code review

5. **After merging**:
   - Delete feature branch
   - Update deployment
   - Monitor for issues

6. **Pre-Development**:
   - Always update local repository
   - Check for pending changes
   - Verify remote connection

7. **Post-Development**:
   - Push changes promptly
   - Monitor Vercel deployment
   - Verify functionality 