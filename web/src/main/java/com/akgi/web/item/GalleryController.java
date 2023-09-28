package com.akgi.web.item;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGalleries() {
        return ResponseEntity.ok(galleryService.getAllGalleries());
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<Gallery> getGalleryByCode(@PathVariable String code) {
        return galleryService.getGalleryByCode(code)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{prefix}")
    public ResponseEntity<List<Gallery>> getGalleriesByCategoryCodePrefix(@PathVariable String prefix) {
        return ResponseEntity.ok(galleryService.getGalleriesByCategoryCodePrefix(prefix));
    }

    @GetMapping("/name/{partName}")
    public ResponseEntity<List<Gallery>> getGalleriesByNameContaining(@PathVariable String partName) {
        return ResponseEntity.ok(galleryService.getGalleriesByNameContaining(partName));
    }
}
