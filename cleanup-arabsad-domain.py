#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to clean up and replace all arabsad.com references with GitHub Pages URLs
Author: Sherif Salama (sherow1982)
Date: January 23, 2026
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Tuple

# ANSI color codes for terminal output
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

# Configuration
REPLACEMENTS = {
    # Main domain replacement
    'https://www.arabsad.com': 'https://sherow1982.github.io',
    'https://arabsad.com': 'https://sherow1982.github.io',
    'www.arabsad.com': 'sherow1982.github.io',
    'arabsad.com': 'sherow1982.github.io',
    
    # Subdomain replacement (hadaya-emirates.arabsad.com)
    'hadaya-emirates.arabsad.com': 'sherow1982.github.io/hadaya-emirates',
    'https://hadaya-emirates.arabsad.com': 'https://sherow1982.github.io/hadaya-emirates',
    'http://hadaya-emirates.arabsad.com': 'https://sherow1982.github.io/hadaya-emirates',
    
    # Meta tags and descriptions
    'مؤسسة إعلانات العرب - ArabSad': 'مؤسسة إعلانات العرب - GitHub Pages',
}

# File extensions to process
ALLOWED_EXTENSIONS = {
    '.html', '.htm', '.css', '.js', '.json', '.md', '.txt',
    '.xml', '.svg', '.py', '.sh', '.yaml', '.yml', '.htaccess',
    '.conf', '.config'
}

# Files/directories to skip
SKIP_PATTERNS = [
    '.git', '.gitignore', '__pycache__', '.DS_Store',
    'node_modules', '.venv', 'venv', '.env',
    '.github/workflows', 'dist', 'build'
]

class DomainCleanup:
    def __init__(self, repos_dir: str = '.'):
        self.repos_dir = repos_dir
        self.total_files = 0
        self.modified_files = 0
        self.replacements_count = 0
        self.errors = []
        self.skipped = []
        
    def should_process_file(self, file_path: Path) -> bool:
        """Check if file should be processed"""
        # Check extension
        if file_path.suffix.lower() not in ALLOWED_EXTENSIONS:
            return False
        
        # Check skip patterns
        path_str = str(file_path)
        for pattern in SKIP_PATTERNS:
            if pattern in path_str:
                return False
        
        # Check if file is readable
        try:
            if file_path.is_file() and os.access(file_path, os.R_OK):
                return True
        except (OSError, PermissionError):
            pass
        
        return False
    
    def process_file(self, file_path: Path) -> Tuple[bool, int]:
        """Process a single file and replace arabsad.com references"""
        try:
            # Read file
            with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
                original_content = f.read()
            
            modified_content = original_content
            replacements = 0
            
            # Apply replacements
            for old_value, new_value in REPLACEMENTS.items():
                # Use case-insensitive replacement for domain names
                pattern = re.compile(re.escape(old_value), re.IGNORECASE)
                new_content = pattern.sub(new_value, modified_content)
                
                if new_content != modified_content:
                    count = len(pattern.findall(modified_content))
                    replacements += count
                    modified_content = new_content
            
            # Write file if modified
            if modified_content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(modified_content)
                return True, replacements
            
            return False, 0
            
        except Exception as e:
            self.errors.append((str(file_path), str(e)))
            return False, 0
    
    def scan_and_process(self, repo_path: str) -> Dict:
        """Scan repository and process all files"""
        results = {
            'repo': repo_path,
            'files_processed': 0,
            'files_modified': 0,
            'total_replacements': 0,
            'errors': []
        }
        
        repo_full_path = Path(repo_path)
        
        if not repo_full_path.exists():
            return results
        
        # Walk through all files
        for file_path in repo_full_path.rglob('*'):
            if self.should_process_file(file_path):
                results['files_processed'] += 1
                self.total_files += 1
                
                modified, replacements = self.process_file(file_path)
                if modified:
                    results['files_modified'] += 1
                    results['total_replacements'] += replacements
                    self.modified_files += 1
                    self.replacements_count += replacements
        
        return results
    
    def print_summary(self, results: List[Dict]):
        """Print summary of changes"""
        print(f"\n{Colors.HEADER}{Colors.BOLD}" + "="*60)
        print("📊 ARABSAD.COM CLEANUP SUMMARY")
        print("="*60 + f"{Colors.ENDC}\n")
        
        total_repos = len(results)
        total_files_processed = sum(r['files_processed'] for r in results)
        total_files_modified = sum(r['files_modified'] for r in results)
        total_replacements = sum(r['total_replacements'] for r in results)
        
        print(f"{Colors.OKBLUE}Repositories processed: {Colors.BOLD}{total_repos}{Colors.ENDC}")
        print(f"{Colors.OKBLUE}Total files scanned: {Colors.BOLD}{total_files_processed}{Colors.ENDC}")
        print(f"{Colors.OKGREEN}Files modified: {Colors.BOLD}{total_files_modified}{Colors.ENDC}")
        print(f"{Colors.OKGREEN}Total replacements: {Colors.BOLD}{total_replacements}{Colors.ENDC}\n")
        
        # Repository-by-repository breakdown
        print(f"{Colors.HEADER}{Colors.BOLD}Repository Breakdown:{Colors.ENDC}\n")
        for result in results:
            if result['files_modified'] > 0:
                print(f"{Colors.OKCYAN}📁 {result['repo']}{Colors.ENDC}")
                print(f"   {Colors.OKGREEN}✓{Colors.ENDC} Files modified: {result['files_modified']}")
                print(f"   {Colors.OKGREEN}✓{Colors.ENDC} Replacements: {result['total_replacements']}\n")
        
        # Show errors if any
        if self.errors:
            print(f"\n{Colors.WARNING}{Colors.BOLD}⚠️  Errors Encountered:{Colors.ENDC}")
            for file_path, error in self.errors:
                print(f"   {Colors.FAIL}✗{Colors.ENDC} {file_path}: {error}")
        
        print(f"\n{Colors.HEADER}{Colors.BOLD}" + "="*60 + f"{Colors.ENDC}")
        print(f"{Colors.OKGREEN}{Colors.BOLD}✅ CLEANUP COMPLETE!{Colors.ENDC}")
        print(f"{Colors.HEADER}{Colors.BOLD}" + "="*60 + f"{Colors.ENDC}\n")

def main():
    """Main execution"""
    print(f"\n{Colors.HEADER}{Colors.BOLD}🚀 arabsad.com Domain Cleanup Tool{Colors.ENDC}")
    print(f"{Colors.HEADER}Starting cleanup process...{Colors.ENDC}\n")
    
    cleanup = DomainCleanup()
    results = []
    
    # List of repositories to process
    # Replace these with actual repository paths
    repos_to_process = [
        'arabsad',
        'arabic-ads',
        'arabic-ads-calculator-tools',
        'sooq-alemarat',
        'sooq-oman',
        'sooq-masr',
        'sooq-Jordan',
        'sooq-qatar',
        'emirates-gifts',
        'amazing-uae',
        'Iraq-Store',
        'iraq-ninja-store',
        'alsooq-alsaudi',
        'alsooq-alqatary',
        'matjar-oman',
        'Emirates-shopping',
        'Kuwait-matjar',
        'hadaya-emirates.arabsad.com',
        'mahkzoon-alsaudia',
        'matjar-makhzoon-alemarat',
        'matjar-makhzoon-oman',
        'matager-makhzoon-alemarat',
        'store-ideal',
        'safahat-khadamat',
        'aqarat',
    ]
    
    for repo in repos_to_process:
        if os.path.isdir(repo):
            result = cleanup.scan_and_process(repo)
            results.append(result)
            print(f"{Colors.OKCYAN}✓ Processed: {repo}{Colors.ENDC}")
        else:
            print(f"{Colors.WARNING}⊘ Skipped: {repo} (directory not found){Colors.ENDC}")
    
    # Print summary
    cleanup.print_summary(results)
    
    # Return exit code
    return 0 if not cleanup.errors else 1

if __name__ == '__main__':
    exit(main())
