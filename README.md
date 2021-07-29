# store-db
simple localStorage wrapper to make use easier.

# Usage

### saveOne(@key, @value, @options)
```javascript
    /*  @key {String}
        @value {Any}
        @options {Object} --> This is an optional param.
    */
    
    const key = 'your-key';
    const value = ['my', { nested: 'structure' }, ':^)'];
    const options = { ttl: 1000 }; // Currently only supports ttl option
    saveOne(key, value, options);
```
