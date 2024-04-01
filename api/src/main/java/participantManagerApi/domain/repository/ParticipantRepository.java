package participantManagerApi.domain.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import participantManagerApi.domain.dto.ParticipantResponse;
import participantManagerApi.domain.entity.Participant;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, UUID> {

    Optional<Participant> findByCode(Long code);

    @Query(value = "select " +
            "new participantManagerApi.domain.dto.ParticipantResponse(code, status, name,  externalCode,  phoneNumber,  cpfCnpj,  digitalSignature)" +
            " from Participant p WHERE ( CAST(:name AS string) IS NULL " +
            "        OR UPPER(p.name) LIKE '%'|| UPPER(CAST(:name AS string)) || '%' " +
            "    ) ")
    Page<ParticipantResponse> find(@Param("name") String name, Pageable page);

//    @Query(value = "delete from Participant p where p.code in  " +
//            "new participantManagerApi.domain.dto.ParticipantResponse(code, status, name,  externalCode,  phoneNumber,  cpfCnpj,  digitalSignature)" +
//            " from Participant")
//    void deleteByCodeList();

    void deleteByCodeIn(List<Long> code);

}