# Personal, opinionated, Tailwind CSS v4.0 preset

This Tailwind CSS preset is primarily meant for personal use; it applies opinionated styles and disables or overwrites some Tailwind CSS defaults.

## Installation

Install the package via NPM _(or yarn)_:

```bash
npm i @vicgutt/tailwindcss-opinionated-preset
```

```bash
yarn add @vicgutt/tailwindcss-opinionated-preset
```


## Usage

After installation, add the preset to your entry CSS file:

```css
@import 'tailwindcss';

@import 'path/to/node_modules/@vicgutt/tailwindcss-opinionated-preset/src/index.css';
```

Or add parts of the preset to your entry CSS file:

```css
@import 'tailwindcss';

@import 'path/to/node_modules/@vicgutt/tailwindcss-opinionated-preset/src/base/opinionated.css';
@import 'path/to/node_modules/@vicgutt/tailwindcss-opinionated-preset/src/setup/colors.css';
/* others... */
```

Checkout the [`src` directory](https://github.com/vicgutt/tailwindcss-opinionated-preset/blob/main/src) for the full list of available CSS files and changes made within them.

<!-- ## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently. -->

## Contributing

If you're interested in contributing to the project, please read our [contributing docs](https://github.com/vicgutt/tailwindcss-opinionated-preset/blob/main/.github/CONTRIBUTING.md) **before submitting a pull request**.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

-   [Victor GUTT](https://github.com/vicgutt)
-   [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
