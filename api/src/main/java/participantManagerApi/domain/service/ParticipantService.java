package participantManagerApi.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import participantManagerApi.domain.dto.ParticipantRequest;
import participantManagerApi.domain.dto.ParticipantResponse;
import participantManagerApi.domain.entity.Participant;
import participantManagerApi.domain.repository.ParticipantRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    public void insert(ParticipantRequest request) throws Exception {
        if (Objects.isNull(request))
            throw new Exception("Participante não pode ser nulo");
        if (Objects.isNull(request.getCpfCnpj()) && !request.getNotAplicateCnpjCpf() )
            throw new Exception("Participante não pode ser nulo");

        participantRepository.save(new Participant(request));
    }

    public void update(ParticipantRequest request) {
        participantRepository.save(new Participant(request));
    }

    @Transactional
    public void deleteByCodeList(List<Long> codesToDelete) {
        participantRepository.deleteByCodeIn(codesToDelete);
    }

    public Optional<Participant> findByCode(Long code) {
        return participantRepository.findByCode(code);
    }

    public Page<ParticipantResponse> find(String name, Pageable pageable) {
        return participantRepository.find(name, pageable);
    }

}
