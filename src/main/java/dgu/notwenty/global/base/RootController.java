package dgu.notwenty.global.base;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/health")
    public ApiResponse<String> healthCheck() {
        return ApiResponse.onSuccess("I'm healthy!");
    }
}
