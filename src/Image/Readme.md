This is a replacement for the `<img />` and `<figure />` tags. The idea is to have
an image placeholder which will show the image when loaded and an optional caption.

```javascript
<Image animate resources='/img/wallpaper.jpg'>
    The vast universe around us
</Image>
```

Providing resources according to viewport:

```javascript
<Image animate resources={{
    small: '/img/small.jpg',
    medium: '/img/medium.jpg',
    large: '/img/large.jpg',
    xlarge: '/img/xlarge.jpg'
}}>
    The vast universe around us
</Image>
```
