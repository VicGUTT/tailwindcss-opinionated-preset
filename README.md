# H1 title

Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores porro culpa, officia, totam atque perspiciatis, facilis necessitatibus accusamus delectus illum unde distinctio similique excepturi aut rerum eveniet eum est debitis.
Here's a quick example:

```js
// tailwind.config.js

module.exports = {
    theme: {
        // ...
    },
    plugins: [
        require('@vicgutt/tailwindcss-opinionated-preset')({
            // ...
        }),
    ],
};
```

## How it works

Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores porro culpa, officia, totam atque perspiciatis, facilis necessitatibus accusamus delectus illum unde distinctio similique excepturi aut rerum eveniet eum est debitis.

Lorem ipsum dolor sit amet consectetur adipisicing elit.

## Installation

Install the package via NPM _(or yarn)_:

```bash
npm i @vicgutt/tailwindcss-opinionated-preset
```

```bash
yarn add @vicgutt/tailwindcss-opinionated-preset
```

Then add the plugin to your tailwind.config.js file:

```js
// tailwind.config.js

module.exports = {
    theme: {
        // ...
    },
    plugins: [
        require('@vicgutt/tailwindcss-opinionated-preset'),
        // ...
    ],
};
```

## Options

The plugin exposes a few options that may be used to configure the plugin's behaviour.

| Name | Type                | Default     | Description |
| ---- | ------------------- | ----------- | ----------- |
| abc  | `string\|undefined` | `undefined` | xyz         |
| abc  | `string\|undefined` | `undefined` | xyz         |
| abc  | `object\|undefined` | `undefined` | xyz         |

Here's an example of how those options can be used:

```js
// tailwind.config.js

module.exports = {
    // ...
    plugins: [
        require('@vicgutt/tailwindcss-opinionated-preset')({
            // ...
        }),
    ],
};
```

## Usage

Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores porro culpa, officia, totam atque perspiciatis, facilis necessitatibus accusamus delectus illum unde distinctio similique excepturi aut rerum eveniet eum est debitis.

### Abc

Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores porro culpa, officia, totam atque perspiciatis, facilis necessitatibus accusamus delectus illum unde distinctio similique excepturi aut rerum eveniet eum est debitis.

#### 123

Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores porro culpa, officia, totam atque perspiciatis, facilis necessitatibus accusamus delectus illum unde distinctio similique excepturi aut rerum eveniet eum est debitis.

Here's examples of how it may be defined:

```js
{
    // ...
}
```

This will produce the following CSS:

```css
/* ... */
```

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
