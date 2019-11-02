# Site Top Level Domain

Static site built using Nikola.

## Development environment

Requirements:

* Python with pip

Install virtualenv using pip then create an environment for Nikola.

```bash
virtualenv .env
source .env/bin/activate
pip install --upgrade "Nikola[extras]"
```

The site has been built and tested with the following environment versions:

* Python 3.7.3
* pip 19.3.1
* Nikola 8.0.2

## Building the site

This site requires the Nikola *bootstrap4* theme. With your virtual Python environment activate, install the theme:

```bash
nikola theme -i bootstrap4
```

To build the static site:

```bash
nikola build
```

To serve the site and test in browser (not for production):

```bash
nikola serve -b
```

## Adding to the site

### New page

To add a new page run the command:

```bash
nikola new_page
```

Then enter the following via prompt:

* Title - Title of page

### New blog post

To add a new page run the command:

```bash
nikola new_post
```

Then enter the following via prompt:

* Title - Title of post
