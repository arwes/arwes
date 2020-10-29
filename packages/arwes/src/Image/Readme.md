This is a replacement for the `<img />` and `<figure />` tags. The idea is to have
an image placeholder which will show the image when loaded and an optional caption.

```javascript
<Image animate resources='/static/images/wallpaper.jpg'>
    The vast universe around us
</Image>
```

Providing resources according to viewport:

```javascript
<Image animate resources={{
    small: '/static/images/small.jpg',
    medium: '/static/images/medium.jpg',
    large: '/static/images/large.jpg',
    xlarge: '/static/images/xlarge.jpg'
}}>
    The vast universe around us
</Image>
```
