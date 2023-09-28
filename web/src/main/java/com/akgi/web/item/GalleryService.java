package com.akgi.web.item;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;

    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    public Optional<Gallery> getGalleryByCode(String code) {
        return galleryRepository.findByCode(code);
    }

    public List<Gallery> getGalleriesByCategoryCodePrefix(String prefix) {
        return galleryRepository.findByCategoryCodeStartingWith(prefix);
    }

    public List<Gallery> getGalleriesByNameContaining(String partName) {
        return galleryRepository.findByNameContaining(partName);
    }

    // Other CRUD methods...
}
