---
description: Runs a tournament of subagents and determines which did the best
argument-hint: "[Implement]"
---

Run a tournament for a given task.

Follow these steps exactly:

## Phase 1: Setup

1. Determine the current branch name and repo root.
2. Create 3 git worktrees off the current branch:

```bash
   git worktree add ../worktree-agent-1 -b tournament/agent-1
   git worktree add ../worktree-agent-2 -b tournament/agent-2
   git worktree add ../worktree-agent-3 -b tournament/agent-3
```

3. Confirm all 3 worktrees were created successfully with `git worktree list`.

## Phase 2: Parallel Implementation

Launch 3 Claude Code subagents in parallel, one in each worktree. Each agent
should run the `/$1` command with the task description and a unique
strategy hint.

Run this exact bash command:

```bash
claude -p "/$1 Variant: $2" \
  --max-turns 15 \
  --output-file ../tournament-result-1.md \
  -d ../worktree-agent-1 &
PID1=$!

claude -p "/$1 Variant: $3" \
  --max-turns 15 \
  --output-file ../tournament-result-2.md \
  -d ../worktree-agent-2 &
PID2=$!

claude -p "/$1 Variant: $4" \
  --max-turns 15 \
  --output-file ../tournament-result-3.md \
  -d ../worktree-agent-3 &
PID3=$!

echo "Waiting for all agents to complete..."
wait $PID1 $PID2 $PID3
echo "All agents finished."
```

## Phase 3: Review

After all agents finish:

1. For each worktree, examine the git diff to see what each agent changed:

```bash
   for i in 1 2 3; do
     echo "=== Agent $i Changes ==="
     cd ../worktree-agent-$i
     git diff tournament/agent-$i~..tournament/agent-$i
     cd -
   done
```

2. If there's a test suite, run tests in each worktree:

```bash
   for i in 1 2 3; do
     echo "=== Agent $i Test Results ==="
     cd ../worktree-agent-$i
     # Adapt this to the project's test runner:
     npm test 2>&1 || true
     cd -
   done
```

3. Also read each agent's output summary:

```bash
   for i in 1 2 3; do
     echo "=== Agent $i Summary ==="
     cat ../tournament-result-$i.md
   done
```

## Phase 4: Evaluate

Compare all three implementations on these criteria:

- **Correctness**: Does it handle all edge cases? Do tests pass?
- **Design**: Is the API clean and idiomatic?
- **Readability**: Is the code easy to understand and maintain?
- **Performance**: Does it handle large inputs efficiently?
- **Completeness**: Did the agent fully implement the task?

Write a detailed comparison to `tournament-review.md` in the repo root.
