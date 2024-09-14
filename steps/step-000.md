<!--
STEP: 0
Title: Definitions, Terminology, and Standards
Author: Dan Ciborowski <dciborow@microsoft.com>
Status: Active
Type: Process
Created: 8/14/2024
-->

## Introduction

This document serves as the foundational reference for all R2D Service Technical Enhancement Proposals (STEPs), and contains the definitions of **BOLDED** terms.

## Requirement Levels

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119.html).

- **MUST / MUST NOT**: Indicates an absolute requirement.
- **SHOULD / SHOULD NOT**: Suggests a strong recommendation, with valid reasons for ignoring.
- **MAY / OPTIONAL**: Describes an action that is optional.

This document is maintained as a living resource to ensure clarity and consistency in the R2D development process.  
This document SHOULD be updated in future PRs to include more reference sections as required.

---

## Copilot Instructions

To ensure accuracy and maintainability, GitHub Copilot is expected to follow these rules every time this workspace is used:

1. **Maintain the Accuracy of This Document**:
   - Copilot MUST ensure that all **bolded terms** and **requirement levels** remain consistent and correct whenever this file is modified.
   - Copilot SHOULD notify the user if any updates to this document are necessary after new STEPs or standards are introduced.

2. **Keep Documentation Up to Date**:
   - Copilot MUST ensure that the **public-facing documentation** in the `docs/public` folder and **developer-facing documentation** in the `docs/dev` folder are always kept in sync with code changes.
   - Copilot SHOULD recommend updates to this document whenever significant changes or new terminology are introduced in the system.

3. **Sync with GitHub Pages**:
   - Copilot SHALL ensure that any updates to public-facing features are reflected in the documentation within `docs/public`, which is published to GitHub Pages.
   - Copilot SHALL trigger the appropriate pipelines to deploy the updated documentation to GitHub Pages upon any successful merge into the `main` branch.

4. **Documentation Structure**:
   - Public-facing documentation is stored in the `docs/public` folder.
   - Developer-facing documentation is maintained in the `docs/dev` folder.
   - Copilot SHALL verify that each new feature or change includes corresponding documentation in the appropriate folder.

5. **PR Reviews**:
   - Copilot SHALL check that all new PRs are accompanied by relevant documentation updates.

6. **Consistency Across Files**:
   - Copilot SHOULD ensure that all files across the project, including README and other documentation files, follow the standards outlined here.
