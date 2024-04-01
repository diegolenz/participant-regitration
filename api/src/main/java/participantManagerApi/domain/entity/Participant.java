package participantManagerApi.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import participantManagerApi.domain.dto.ParticipantRequest;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code")
    private Long code;
    @Column(name = "status")
    private Boolean status;
    @Column(name = "name", nullable = false)
    @NotEmpty
    private String name;
    @Column(name = "external_code")
    private String externalCode;
    @Column(name = "mail")
    private String mail;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "cpf_cnpj")
    private String cpfCnpj;
    @Column(name = "gender")
    private String gender;
    @Column(name = "marital")
    private String marital;
    @Column(name = "document")
    private String document;
    @Column(name = "spouse")
    private String spouse;
    @Column(name = "notAplicateCnpjCpf")
    private Boolean notAplicateCnpjCpf;
    @Column(name = "tokenSms")
    private Boolean tokenSms;
    @Column(name = "exposedPerson")
    private Boolean exposedPerson;
    @Column(name = "digitalSignature")
    private Boolean digitalSignature;

    public Participant() {
    }

    public Participant(ParticipantRequest request) {
        //Participant participantEntity = new Participant();
        code = request.getCode();
        externalCode = request.getExternalCode();
        name = request.getName();
        mail = request.getMail();
        if (Objects.nonNull(request.getCpfCnpj()))
            cpfCnpj = request.getCpfCnpj().replaceAll("[^\\d.]", "");
        notAplicateCnpjCpf = request.getNotAplicateCnpjCpf();
        if (Objects.nonNull(request.getDocument()))
            document = request.getDocument().replaceAll("[^\\d.]", "");
        marital = request.getMarital();
        gender = request.getGender();
        exposedPerson = request.getExposedPerson();
        status = request.getStatus();
        tokenSms = request.getTokenSms();
        if (Objects.nonNull(request.getPhoneNumber()))
            phoneNumber = request.getPhoneNumber().replaceAll("[^\\d.]", "");
    }

}
