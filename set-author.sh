#!/bin/bash

# Set the correct author information for this repository
git config user.name "uelkerd"
git config user.email "uelkerd@users.noreply.github.com"

echo "Git author set to: uelkerd <uelkerd@users.noreply.github.com>"
echo "Future commits will use this author information."

# Instructions for making commits with the correct author
echo ""
echo "To ensure commits use this author, you can also use:"
echo "GIT_AUTHOR_NAME=\"uelkerd\" GIT_AUTHOR_EMAIL=\"uelkerd@users.noreply.github.com\" \\"
echo "GIT_COMMITTER_NAME=\"uelkerd\" GIT_COMMITTER_EMAIL=\"uelkerd@users.noreply.github.com\" \\"
echo "git commit -m \"Your commit message\"" 