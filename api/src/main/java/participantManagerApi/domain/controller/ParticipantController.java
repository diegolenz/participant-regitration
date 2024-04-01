package participantManagerApi.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import participantManagerApi.domain.dto.ParticipantDeleteRequest;
import participantManagerApi.domain.dto.ParticipantRequest;
import participantManagerApi.domain.dto.ParticipantResponse;
import participantManagerApi.domain.entity.Participant;
import participantManagerApi.domain.service.ParticipantService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/participant")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    @GetMapping("/find")
    private ResponseEntity<Page<ParticipantResponse>> findAll(@RequestParam(name = "name", required = false) String name,
                                                              @PageableDefault(size = 25, sort = "name") Pageable pageable) {

        Page<ParticipantResponse> participants = this.participantService.find(name, pageable);

        return ResponseEntity.ok(participants);
    }

    @GetMapping("/find-by-id")
    private ResponseEntity<Participant> findByCode(@RequestParam(name = "code") Long code) {
        Optional<Participant> participant = this.participantService.findByCode(code);

        if (participant.isEmpty())
            ResponseEntity.notFound().build();

        return ResponseEntity.ok(participant.get());
    }

    @PostMapping("/insert")
    private ResponseEntity insert(@RequestBody ParticipantRequest participantRequest) {
        try {
            participantService.insert(participantRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity
                .ok().build();
    }

    @PutMapping("/update")
    private ResponseEntity update(@RequestBody ParticipantRequest participantRequest) {
        participantService.update(participantRequest);
        return ResponseEntity
                .ok().build();
    }

    @PutMapping("/delete-by-code-list")
    private ResponseEntity delete(@RequestBody List<Long> request) {
        participantService.deleteByCodeList(request);
        return ResponseEntity
                .ok().build();
    }

}
