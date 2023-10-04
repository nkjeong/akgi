package com.akgi.web.file;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/files")
public class GetFileList {

    @GetMapping("/list")
    public List<String> getFilesList(@RequestParam String directoryPath) {
        File directory = new File(directoryPath);
        String realPath = directory.getAbsolutePath();
        System.out.println(directoryPath);
        System.out.println(realPath);
        
        File realDirectory = new File(realPath);
        
        File[] files = realDirectory.listFiles();
        List<String> filenames = new ArrayList<>();

        if (files != null) {
            for (File file : files) {
                filenames.add(file.getName());
            }
        }
        return filenames;
    }
}
