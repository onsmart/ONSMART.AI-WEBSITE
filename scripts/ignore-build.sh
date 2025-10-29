#!/bin/bash
# Ignora build se não for branch main
[ "$VERCEL_GIT_COMMIT_REF" = "main" ] && exit 0 || exit 1


