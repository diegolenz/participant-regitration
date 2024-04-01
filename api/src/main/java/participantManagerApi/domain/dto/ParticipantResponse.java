package participantManagerApi.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantResponse {
    private Long code;
    private Boolean status;
    private String name;
    private String externalCode;
    private String phoneNumber;
    private String cpfCnpj;
    private Boolean digitalSignature;
}
