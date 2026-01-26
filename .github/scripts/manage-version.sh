#!/bin/bash

# Version Management Script
# Format: Vxx.yyyy (xx = major, yyyy = minor)

VERSION_FILE="VERSION"

# Function to get current version
get_current_version() {
    if [ -f "$VERSION_FILE" ]; then
        cat "$VERSION_FILE"
    else
        echo "V01.0000"
    fi
}

# Function to increment minor version
increment_minor() {
    local current_version=$(get_current_version)
    
    # Extract major and minor parts
    # Remove 'V' prefix and split by '.'
    local version_without_v="${current_version#V}"
    local major=$(echo "$version_without_v" | cut -d'.' -f1)
    local minor=$(echo "$version_without_v" | cut -d'.' -f2)

    # Increment minor version
    # Note: 10# prefix forces base-10 interpretation to prevent
    # octal interpretation of zero-padded numbers (e.g., 0008)
    minor=$((10#$minor + 1))

    # Format minor with leading zeros (4 digits)
    minor=$(printf "%04d" $minor)
    
    # Create new version
    local new_version="V${major}.${minor}"
    echo "$new_version"
}

# Function to increment major version
increment_major() {
    local current_version=$(get_current_version)
    
    # Extract major part
    local version_without_v="${current_version#V}"
    local major=$(echo "$version_without_v" | cut -d'.' -f1)

    # Increment major version
    # Note: 10# prefix forces base-10 interpretation to prevent
    # octal interpretation of zero-padded numbers (e.g., 08)
    major=$((10#$major + 1))

    # Format major with leading zeros (2 digits)
    major=$(printf "%02d" $major)
    
    # Reset minor to 0000
    local new_version="V${major}.0000"
    echo "$new_version"
}

# Function to set version
set_version() {
    local new_version=$1
    echo "$new_version" > "$VERSION_FILE"
    echo "Version updated to: $new_version"
}

# Main script logic
case "$1" in
    "get")
        get_current_version
        ;;
    "increment-minor")
        new_version=$(increment_minor)
        set_version "$new_version"
        ;;
    "increment-major")
        new_version=$(increment_major)
        set_version "$new_version"
        ;;
    "set")
        if [ -z "$2" ]; then
            echo "Error: Please provide a version string (e.g., V01.0001)"
            exit 1
        fi
        set_version "$2"
        ;;
    *)
        echo "Usage: $0 {get|increment-minor|increment-major|set VERSION}"
        echo "Examples:"
        echo "  $0 get                    # Get current version"
        echo "  $0 increment-minor        # Increment minor version"
        echo "  $0 increment-major        # Increment major version"
        echo "  $0 set V02.0015          # Set specific version"
        exit 1
        ;;
esac
