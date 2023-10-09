package com.akgi.web.member;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberController {

    @GetMapping("/join")
    public String joinPage() {
        return "join/index";
    }
}