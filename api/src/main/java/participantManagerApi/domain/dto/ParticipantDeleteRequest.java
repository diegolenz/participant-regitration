package participantManagerApi.domain.dto;

import lombok.Data;

import java.util.List;

@Data
public class ParticipantDeleteRequest {
    private List<Long> codesToExclude;
}
