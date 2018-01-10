This is a replacement for the `<img />` and `<figure />` tags. The idea is to have
an image placeholder which will show the image when loaded and an optional caption.

```javascript
<Image animate resources='/static/img/wallpaper.jpg'>
    The vast universe around us
</Image>
```

Providing resources according to viewport:

```javascript
<Image animate resources={{
    small: '/static/img/small.jpg',
    medium: '/static/img/medium.jpg',
    large: '/static/img/large.jpg',
    xlarge: '/static/img/xlarge.jpg'
}}>
    The vast universe around us
</Image>
```
